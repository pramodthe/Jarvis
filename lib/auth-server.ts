import { cookies } from 'next/headers';

export async function currentUser() {
  const cookieStore = await cookies();
  const email = cookieStore.get('mock_user_email')?.value || "developer@example.com";
  const name = cookieStore.get('mock_user_name')?.value || "AI Learner";

  return {
    fullName: name,
    primaryEmailAddress: {
      emailAddress: email
    }
  };
}
