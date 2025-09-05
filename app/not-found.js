import Image from "next/image";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="text-black bg-white">
      <div className="flex">
        <div className="m-auto text-center">
          <div>
            <Image
              width={600}
              height={400}
              src="/404.svg"
              alt="not-found-image"
            />
          </div>
          <p className="text-sm md:text-base text-slade-500 p-2 mb-4">
            The page you were looking for does not exist
          </p>
          <Link
            className="bg-transparent hover:bg-[#eb4a36]
                         text-red-500 hover:text-white rounded 
                         shadow hover:shadow-lg py-2 px-4 border border-[#eb4a36]
                         hover:border-transparent"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
