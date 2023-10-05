import Link from "next/link";

interface Props {
    url: string;
    isClicked: boolean;
    place: string;
}

export default function EachPlanNav({ url, isClicked, place }: Props) {
    return (
        <>
            {isClicked == true ? (
                <div className="h-9 w-3/5 bg-sky-600">
                    <Link href={url} legacyBehavior>
                        <a>
                            <h2 className="pl-1 pt-1 text-lg text-white">
                                {place}
                            </h2>
                        </a>
                    </Link>
                </div>
            ) : (
                <div className="h-9 w-3/5 border border-black">
                    <Link href={url} legacyBehavior>
                        <a>
                            <h2 className="pl-1 pt-1 text-lg">{place}</h2>
                        </a>
                    </Link>
                </div>
            )}
        </>
    );
}
