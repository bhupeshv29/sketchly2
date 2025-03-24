import { getRoom } from "@/actions/getRoom"
import { RoomCanvas } from "@/canvas/RoomCanvas"



const page = async ({params}: {
    params : {
        roomName :string
    }
}) => {

    const roomName = params.roomName;
    const room = await getRoom(roomName)


  return (

        <RoomCanvas roomId={room.id} room={room} />

  )
}

export default page