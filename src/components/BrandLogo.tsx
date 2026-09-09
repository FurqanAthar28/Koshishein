type BrandLogoProps = {
  variant?: "light" | "dark";
};

export default function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <img className="brand-logo-image" src="/images/koshishein-wordmark-transparent.png" alt="Koshishein" />
    </span>
  );
}
