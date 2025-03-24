import { getRoom } from "@/actions/getRoom"
import { RoomCanvas } from "@/canvas/RoomCanvas"



const page = async (
    props: {
        params : Promise<{
            roomName :string
        }>
    }
) => {
    const params = await props.params;

    const roomName = params.roomName;
    const room = await getRoom(roomName)


    return (

          <RoomCanvas roomId={room.id} room={room} />

    )
}

export default page