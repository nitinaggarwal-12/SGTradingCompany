import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteContent, products, layoutBlocks } = body;

    // Strict Domain & Business Rule Sanity Validation (Phase 6 Enhancement)
    if (products && Array.isArray(products)) {
      for (const product of products) {
        if (product.priceExclGst !== undefined && Number(product.priceExclGst) <= 0) {
          return NextResponse.json(
            {
              success: false,
              error: `Validation Error: Product "${product.name}" price must be greater than 0.`,
            },
            { status: 400 }
          );
        }
        if (product.stockQuantity !== undefined && Number(product.stockQuantity) < 0) {
          return NextResponse.json(
            {
              success: false,
              error: `Validation Error: Product "${product.name}" stock cannot be negative.`,
            },
            { status: 400 }
          );
        }
        if (
          product.gstRate !== undefined &&
          ![0, 5, 12, 18, 28].includes(Number(product.gstRate))
        ) {
          return NextResponse.json(
            {
              success: false,
              error: `Validation Error: Invalid Indian GST tax slab ${product.gstRate}% on "${product.name}".`,
            },
            { status: 400 }
          );
        }
      }
    }

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
