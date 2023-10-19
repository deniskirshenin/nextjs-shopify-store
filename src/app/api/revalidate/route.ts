import { revalidate } from "@/app/lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest): Promise<NextResponse> {
    return revalidate(request);
};