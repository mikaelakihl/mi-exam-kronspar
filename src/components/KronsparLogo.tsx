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
                alt="Kronspar"
                className="w-17 h-17 ml-5"
            />

            <SignedIn>
                <div className="absolute top-7 left-3.5 text-center flex flex-col font-bold gap-0 ">
                    <p className="text-xs">
                        {data?.savings?.savedAmount === 0
                            ? '0'
                            : data?.savings?.savedAmount}
                    </p>
                    <h1 className=" font-bold text-background-muted text-stroke ">
                        Kronspar
                    </h1>
                </div>
            </SignedIn>
            <SignedOut>
                <h1 className=" font-bold text-background-muted text-stroke absolute top-11 left-3.5   ">
                    Kronspar
                </h1>


            </SignedOut>
        </div>
    );
};