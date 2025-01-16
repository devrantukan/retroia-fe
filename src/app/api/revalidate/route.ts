import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json();

    // Verify the secret token
    if (token !== process.env.REVALIDATION_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json(
        { message: "Path parameter is required" },
        { status: 400 }
      );
    }

    // Revalidate the path
    revalidatePath(path);

    return NextResponse.json(
      { revalidated: true, message: `Revalidated ${path}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error },
      { status: 500 }
    );
  }
}
