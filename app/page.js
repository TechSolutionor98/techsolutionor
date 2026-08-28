import HomePage, { generateMetadata } from "./Home/page";

export const revalidate = 0;
export { generateMetadata };

export default async function Home() {
  return <HomePage />;
}
