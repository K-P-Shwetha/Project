import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="Container">
      <h1 className="text">Money Manager</h1>
      <p>Track your expenses and manage your finances efficiently.</p>
      <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
      <div class="">
	<p class="text-danger text-center fw-bold mb-5">Here is the CSS only version, made with css animations:</p>
<div class="container">
            <div class="row">
               <div class="col-12">
                  <div class="marquee">
                     <div class="text-track h1 mb-0">
                        Navigate your finances with confidence.

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                           <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>

                        Track spending, budgets.

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                           <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>

                        Master your money with confidence.

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                           <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>
                        Navigate your finances with confidence.

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                           <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>

                        Track spending, budgets.

                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16">
                           <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
	      </div>
    </div>
  );
}