import Users from "../../../models/user";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // For example, fetch data from your DB here
    const id = (await params).id;
    const user = await Users.findById(id).select("username email favorites history").exec();
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }