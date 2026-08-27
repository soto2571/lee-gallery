"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth";
import { moveImage, removeImage, updateAlt } from "@/lib/gallery-store";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const user = String(formData.get("user") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(user, password)) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/** Every mutation below is behind the same session check as the pages. */
async function requireSession() {
  const store = await cookies();
  const ok = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!ok) redirect("/admin/login");
}

/** The gallery is read on demand by the public pages, so only /admin is cached. */
function refreshSite() {
  revalidatePath("/admin");
}

export async function deletePhoto(id: string) {
  await requireSession();
  await removeImage(id);
  refreshSite();
}

export async function movePhoto(id: string, direction: -1 | 1) {
  await requireSession();
  await moveImage(id, direction);
  refreshSite();
}

export async function renamePhoto(id: string, description: string) {
  await requireSession();
  const text = description.trim();
  if (!text) return;
  await updateAlt(id, { es: text, en: text });
  refreshSite();
}
