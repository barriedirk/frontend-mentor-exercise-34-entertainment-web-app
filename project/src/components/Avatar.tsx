interface AvatarProps {
  className?: string;
  alt?: string;
}

export default function Avatar({ className, alt }: AvatarProps) {
  const src = new URL("../assets/image-avatar.png", import.meta.url).href;

  return <img src={src} className={className} alt={alt} />;
}
