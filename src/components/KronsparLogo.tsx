import { SignedIn, SignedOut } from "@clerk/clerk-react";
import type { UserData } from "../mocks/handlers";

type KronsparLogoProps = {
    data: UserData
}

export const KronsparLogo = ({ data }: KronsparLogoProps) => {
    return (
        <div>
            <img
                src="/assets/kronspar-pig.png"
                alt="Spargris med kronspar loggan"
                className="w-17 h-17 ml-4 md:ml-0"
            />

            <SignedIn>
                <div className="absolute top-7.5 left-3 text-center flex flex-col font-bold gap-0 ">
                    <p className="text-xs">

                        {data?.savings?.savedAmount === 0 || !data
                            ? '0'
                            : data?.savings?.savedAmount}
                    </p>
                    <h1 className=" font-bold text-primary text-stroke ">
                        Kronspar
                    </h1>
                </div>
            </SignedIn>
            <SignedOut>
                <h1 className=" font-bold text-primary text-stroke absolute top-11 left-3.5   ">
                    Kronspar
                </h1>


            </SignedOut>
        </div>
    );
};