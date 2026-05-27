export function slug(s) {
  return (s || "business").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 14) || "business";
}

export function ticketId() {
  return Math.floor(10000 + Math.random() * 89999);
}

export function now() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
