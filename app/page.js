import HomePage, { generateMetadata } from "./Home/page";

export { generateMetadata };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  return <HomePage />;
}
