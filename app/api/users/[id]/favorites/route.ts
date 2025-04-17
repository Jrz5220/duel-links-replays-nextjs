import Users from "../../../../models/user";

// most of these api routes are called in /ui/video-section/add-to-favorites-button.tsx
// the components that use these api's need them to insert and retrieve the user's favorites and history data from the client side
// view the POST method for details

// return the user favorite videos
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    // returns an object in the form of {_id: new ObjectId('...'), favorites: [{ ... }, ...]}
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

// add a new video to favorites
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      // you need to convert the body data sent by the request back into json format (it is sent as a json string through JSON.stringify())
      const body = await request.json();
      // extract the 'newVideo' property from the json object
      const { newVideo } = body;
      // 'params' are the parameter values sent in the url.
      // so in /api/users/[id]/favorites route, 'params' would contain the [id] value
      const id = (await params).id;
      const user = await Users.findById(id, "favorites").exec();
      let duplicate = false;
      // the error.tsx page that belongs to the calling component will display the error messages thrown
      if(!newVideo) { throw new Error("No video data was sent with the request") }
      if(!newVideo.duelTitle || !newVideo.duelName) {
        throw new TypeError("The video is missing neccessary data");
      }
      if(typeof newVideo.duelTitle !== "string" || typeof newVideo.duelName !== "string") {
        throw new TypeError("Invalid data types in video object");
      }
      if(user) {
        let userFavorites = user.favorites;
        if(userFavorites.length >= 5) {
          // you can return a json object containing any kind of properties. you don't have to follow this format.
          return new Response(JSON.stringify({ success: false, name: "FullQueueError", message: "Favorites can not exceed 5 videos. Please remove some videos from favorites to save new videos." }), {
            status: 409,  // any status outside the 200s will cause the calling component to throw an error, which is handled by it's error.tsx page
            headers: { 'Content-Type': 'application/json' } // we are sending back json data
          });
        }
        for(let i = 0; i < userFavorites.length; i++) {
          if(userFavorites[i].duelTitle === newVideo.duelTitle) {
            duplicate = true;
            break;
          }
        }
        if(!duplicate) {
          userFavorites.push(newVideo);
          await user.updateOne({ favorites: userFavorites });
          let addedVideo = userFavorites[userFavorites.length - 1];
          return new Response(JSON.stringify(addedVideo), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        return new Response(JSON.stringify({ success: false, name: "DuplicateEntryError", message: "This video already exists in favorites" }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const { videoToDelete } = body;
    const id = (await params).id;
    const user = await Users.findById(id, "favorites").exec();
    let deletedVideo = null;
    if(!videoToDelete) { throw new Error("No video data was sent with the request"); }
    if(!videoToDelete.duelTitle || !videoToDelete.duelName) {
      throw new TypeError("The video is missing neccessary data");
    }
    if(typeof videoToDelete.duelTitle !== "string" || typeof videoToDelete.duelName !== "string") {
      throw new TypeError("Invalid data types in video object");
    }
    if(user) {
      let userFavorites = user.favorites;
      for(let i = 0; i < userFavorites.length; i++) {
        if(userFavorites[i].duelTitle === videoToDelete.duelTitle) {
          deletedVideo = userFavorites[i];  // an object of type IFavoriteVideos
          userFavorites.splice(i, 1);
          break;
        }
      }
      await user.updateOne({ favorites: userFavorites });
      return new Response(JSON.stringify(deletedVideo), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
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
    })
  }
}