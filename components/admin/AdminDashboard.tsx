"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CATEGORY_IDS,
  imagesByCategory,
  type Category,
  type GalleryImage,
} from "@/lib/gallery";
import { deletePhoto, logout, movePhoto, renamePhoto } from "@/app/admin/actions";
import { prepareImage } from "./prepare-image";

const CATEGORY_LABELS: Record<Category, string> = {
  portraits: "Retratos",
  brands: "Brands",
  products: "Products",
};

type QueueItem = {
  key: string;
  name: string;
  preview: string;
  status: "waiting" | "uploading" | "done" | "error";
  error?: string;
};

export function AdminDashboard({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [category, setCategory] = useState<Category>("portraits");
  const [files, setFiles] = useState<File[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const visible = imagesByCategory(images, category);

  function addFiles(picked: FileList | null) {
    if (!picked || uploading) return;
    const accepted = Array.from(picked).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((current) => [...current, ...accepted]);
    setQueue((current) => [
      ...current,
      ...accepted.map((file) => ({
        key: `${file.name}-${file.size}-${Math.random()}`,
        name: file.name,
        preview: URL.createObjectURL(file),
        status: "waiting" as const,
      })),
    ]);
  }

  function removeFromQueue(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
    setQueue((current) => current.filter((_, i) => i !== index));
  }

  async function upload() {
    if (files.length === 0 || uploading) return;
    setUploading(true);
    const failed: number[] = [];

    for (let i = 0; i < files.length; i++) {
      setQueue((q) =>
        q.map((item, index) =>
          index === i ? { ...item, status: "uploading" } : item
        )
      );

      try {
        const prepared = await prepareImage(files[i]);
        const body = new FormData();
        body.append("file", prepared.blob, prepared.name);
        body.append("category", category);
        body.append("description", description);
        body.append("width", String(prepared.width));
        body.append("height", String(prepared.height));

        const res = await fetch("/api/admin/photos", { method: "POST", body });
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload.error ?? "No se pudo subir");
        }

        setQueue((q) =>
          q.map((item, index) =>
            index === i ? { ...item, status: "done" } : item
          )
        );
      } catch (error) {
        failed.push(i);
        setQueue((q) =>
          q.map((item, index) =>
            index === i
              ? {
                  ...item,
                  status: "error",
                  error: error instanceof Error ? error.message : "Error",
                }
              : item
          )
        );
      }
    }

    setUploading(false);

    // Keep only the ones that failed, so she can retry just those.
    setFiles((current) => current.filter((_, i) => failed.includes(i)));
    setQueue((current) => current.filter((_, i) => failed.includes(i)));
    if (failed.length === 0) setDescription("");
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-container px-4 pb-24 pt-8">
      {/* ------------------------------------------------------------ header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-300/70 pb-6">
        <div>
          <h1 className="font-display text-3xl font-light tracking-tightest text-forest sm:text-4xl">
            Panel de fotos
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {images.length} fotos en el sitio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-forest/25 px-4 py-2 text-xs font-medium text-forest transition-colors hover:bg-forest hover:text-cream-50"
          >
            Ver el sitio
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="cursor-pointer rounded-full border border-cream-300 px-4 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
            >
              Salir
            </button>
          </form>
        </div>
      </header>

      {/* -------------------------------------------------------------- tabs */}
      <nav className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {CATEGORY_IDS.map((id) => {
          const count = imagesByCategory(images, id).length;
          const active = id === category;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-forest text-cream-50"
                  : "bg-cream-100 text-ink-muted hover:bg-cream-200"
              }`}
            >
              {CATEGORY_LABELS[id]}
              <span className={active ? "ml-2 opacity-70" : "ml-2 opacity-60"}>
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ------------------------------------------------------------ upload */}
      <section className="mt-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragging
              ? "border-forest bg-forest-50"
              : "border-cream-300 bg-cream-100/60 hover:border-forest/40"
          }`}
        >
          <p className="font-display text-xl text-forest">
            Añadir fotos a {CATEGORY_LABELS[category]}
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Arrastra las fotos aquí o toca para elegirlas
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {queue.length > 0 && (
          <div className="mt-4 rounded-3xl border border-cream-300/70 bg-cream-50 p-4 sm:p-6">
            <div className="flex flex-wrap gap-3">
              {queue.map((item, i) => (
                <div key={item.key} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.preview}
                    alt={item.name}
                    className={`h-24 w-20 rounded-xl object-cover transition-opacity ${
                      item.status === "done" ? "opacity-40" : "opacity-100"
                    }`}
                  />
                  <span className="absolute inset-x-0 bottom-0 rounded-b-xl bg-forest-900/70 px-1 py-0.5 text-center text-[10px] text-cream-50">
                    {item.status === "waiting" && "en espera"}
                    {item.status === "uploading" && "subiendo…"}
                    {item.status === "done" && "lista"}
                    {item.status === "error" && (item.error ?? "error")}
                  </span>
                  {!uploading && (
                    <button
                      type="button"
                      onClick={() => removeFromQueue(i)}
                      aria-label={`Quitar ${item.name}`}
                      className="absolute -right-1.5 -top-1.5 h-6 w-6 cursor-pointer rounded-full bg-forest text-sm leading-none text-cream-50"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <label className="mt-5 block text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
              Descripción (opcional)
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Sesión en la playa"
                className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-ink outline-none transition-colors focus:border-forest"
              />
            </label>

            <button
              type="button"
              onClick={upload}
              disabled={uploading}
              className="mt-4 w-full cursor-pointer rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-forest-500 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {uploading
                ? "Subiendo…"
                : `Subir ${queue.length} ${queue.length === 1 ? "foto" : "fotos"} a ${CATEGORY_LABELS[category]}`}
            </button>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- photos */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-forest">
          {CATEGORY_LABELS[category]}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          El orden de aquí es el orden en el sitio. La primera es la que se ve
          primero.
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 rounded-3xl border border-dashed border-cream-300 py-16 text-center text-sm text-ink-muted">
            Todavía no hay fotos en esta sección.
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((image, i) => (
              <PhotoCard
                key={image.id}
                image={image}
                position={i + 1}
                isFirst={i === 0}
                isLast={i === visible.length - 1}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PhotoCard({
  image,
  position,
  isFirst,
  isLast,
}: {
  image: GalleryImage;
  position: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(image.alt.es);

  return (
    <li
      className={`overflow-hidden rounded-2xl border border-cream-300/70 bg-cream-50 transition-opacity ${
        pending ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-[3/4] bg-cream-200">
        <Image
          src={image.src}
          alt={image.alt.es}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-2 top-2 rounded-full bg-forest-900/70 px-2 py-0.5 text-[11px] text-cream-50">
          {String(position).padStart(2, "0")}
        </span>
      </div>

      <div className="p-3">
        {editing ? (
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              className="min-w-0 flex-1 rounded-lg border border-cream-300 px-2 py-1.5 text-sm outline-none focus:border-forest"
            />
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                startTransition(() => renamePhoto(image.id, text));
              }}
              className="cursor-pointer rounded-lg bg-forest px-3 py-1.5 text-xs text-cream-50"
            >
              OK
            </button>
          </div>
        ) : (
          <p className="truncate text-xs text-ink-muted" title={image.alt.es}>
            {image.alt.es}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-1">
          <div className="flex gap-1">
            <IconButton
              label="Mover antes"
              disabled={isFirst || pending}
              onClick={() => startTransition(() => movePhoto(image.id, -1))}
            >
              ←
            </IconButton>
            <IconButton
              label="Mover después"
              disabled={isLast || pending}
              onClick={() => startTransition(() => movePhoto(image.id, 1))}
            >
              →
            </IconButton>
          </div>
          <div className="flex gap-1">
            <IconButton
              label="Editar descripción"
              disabled={pending}
              onClick={() => setEditing((v) => !v)}
            >
              ✎
            </IconButton>
            <IconButton
              label="Borrar foto"
              disabled={pending}
              danger
              onClick={() => {
                if (confirm("¿Borrar esta foto del sitio?")) {
                  startTransition(() => deletePhoto(image.id));
                }
              }}
            >
              ✕
            </IconButton>
          </div>
        </div>
      </div>
    </li>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`h-8 w-8 cursor-pointer rounded-lg border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-cream-300 text-forest hover:bg-cream-200"
      }`}
    >
      {children}
    </button>
  );
}
