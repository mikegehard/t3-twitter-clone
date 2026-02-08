export default async function updateSession() {
  const res = await fetch("/api/auth/session?update=true");
  console.log(await res.json());
  setTimeout(async () => {
    const res = await fetch("/api/auth/session?update=true");
    console.log(await res.json());
  }, 1000);
}
