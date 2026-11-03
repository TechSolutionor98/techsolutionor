import HomePage, { generateMetadata } from "./Home/page";

export { generateMetadata };
// Enable 5-minute Incremental Static Regeneration (ISR) to serve from Edge CDN with 0ms compute time
export const revalidate = 300;

export default async function Home() {
  return <HomePage />;
}
