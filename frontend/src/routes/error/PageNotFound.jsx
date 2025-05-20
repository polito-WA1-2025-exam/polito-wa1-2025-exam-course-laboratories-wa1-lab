import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function PageNotFound() {

    return (
        <div className="min-h-170 container mx-auto py-8 content-center text-center text-3xl text-red-500">
            <div>
                <h1 className="inline m-3">
                    Page not found: maybe return to
                </h1>
                <Link to='/' className="inline">
                    <Button className="font-bold text-xl p-7">
                        home page
                    </Button>
                </Link>
            </div>
        </div>
    );
}