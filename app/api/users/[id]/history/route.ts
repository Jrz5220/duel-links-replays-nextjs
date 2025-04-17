import Users from "../../../../models/user";

// view api/users/[id]/favorites route for details on how these methods work

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        let userFavorites = await Users.findById(id, "favorites").exec();
        if(userFavorites) {
            userFavorites = {
              favorites: userFavorites.favorites
            }
            return new Response(JSON.stringify(userFavorites), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ success: false, name: "UserNotFoundError", message: "A valid user could not be found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
    } catch(error: any) {
        const errorDetails = {
            success: false,
            message: error.message
        }
        return new Response(JSON.stringify(errorDetails), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// upload a new video to user's history
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const { newVideo } = body;
        const id = (await params).id;
        const user = await Users.findById(id).select("history").exec();
        if(!newVideo) { throw new Error("No video data was sent with the request"); }
        if(!newVideo.duelTitle || !newVideo.duelName) {
            throw new Error("The video is missing neccessary data.");
        }
        if(typeof newVideo.duelTitle !== "string" || typeof newVideo.duelName !== "string") {
            throw new Error("Invalid data types in video object");
        }
        if(user) {
            const userHistory = user.history;
            for(let i = 0; i < userHistory.length; i++) {
                if(userHistory[i].duelTitle === newVideo.duelTitle) {
                    userHistory.splice(i, 1);
                }
            }
            if(userHistory.length >= 5) {
                userHistory.shift();    // remove the first item from the array
            }
            userHistory.push(newVideo);
            await user.updateOne({history: userHistory});
            return new Response(JSON.stringify(newVideo), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const userNotFound = {
            name: "UserNotFoundError",
            message: "A user could not be found"
          }
        return new Response(JSON.stringify(userNotFound), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch(error: any) {
        const errorDetails = {
            success: false,
            message: error.message
        }
        return new Response(JSON.stringify(errorDetails), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
  }