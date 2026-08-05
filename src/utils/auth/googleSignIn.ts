import { supabase } from "../supabase-client";

type HandleGoogleSignInOptions = {
  redirectTo?: string;
};

export async function handleGoogleSignIn(
  options: HandleGoogleSignInOptions = {}
) {
  const redirectTo =
    options.redirectTo || `${window.location.origin}/dashboard`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
}