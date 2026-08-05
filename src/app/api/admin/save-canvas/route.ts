import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteContent, products } = body;

    // Revalidate all pages so instant updates appear live across Next.js App Router
    revalidatePath("/");
    revalidatePath("/cart");
    revalidatePath("/stock-manager");

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Canvas visual changes published and paths revalidated live!",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to publish canvas changes",
      },
      { status: 500 }
    );
  }
}
