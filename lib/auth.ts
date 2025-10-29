import { supabase } from "./supabase";

// Load and normalize admin emails (comma-separated)
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((e) =>
      e.trim().toLowerCase()
    )
  : [];

export const checkAdminAccess = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isAdmin: false, user: null };
    }

    const email = user.email?.toLowerCase() || "";
    const isAdmin =
      ADMIN_EMAILS.includes(email) || user.user_metadata?.role === "admin";

    return { isAdmin, user };
  } catch (error) {
    console.error("Error checking admin access:", error);
    return { isAdmin: false, user: null };
  }
  console.log('Loaded ADMIN_EMAILS:', ADMIN_EMAILS)
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const signUp = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase();
  const isAdmin = ADMIN_EMAILS.includes(normalizedEmail);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: isAdmin ? "admin" : "user" },
    },
  });

  return { data, error };
};
