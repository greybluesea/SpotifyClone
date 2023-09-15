"use client";

import useAuthModal from "@/hooks/useAuthModal";
import usePutSongsIntoPlayer from "@/hooks/usePutSongsIntoPlayer";
import useUploadModal from "@/hooks/useUploadModal";
import useUserContext from "@/hooks/useUserContext";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiSolidCloudUpload } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";
import { Song } from "../../types_incl_stripe";
import UploadItem from "./UploadItem";
import Footer from "./Footer";

type Props = {
  songs: Song[];
};

const YourUploads = ({ songs }: Props) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const userContext = useUserContext();
  const putSongIntoPlayer = usePutSongsIntoPlayer(songs);
  const router = useRouter();
  const pathname = usePathname();

  // fetching songs from client side; changed to using server side fetching
  /* const supabaseClient = useSupabaseClient();
  const [songs, setSongs] = useState([] as Song[]);

  const fetchSongsByUserId = async (id: string | undefined) => {
    if (typeof id === "undefined") return;
    const { data: songs, error } = await supabaseClient
      .from("songs")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      return;
    }
    setSongs(songs);
    return;
  };

  useEffect(() => {
    userContext?.user ? fetchSongsByUserId(userContext.user.id) : setSongs([]);
  }, [userContext.user]); */

  const handleClick = () => {
    if (!userContext.user) {
      toast.success("please sign in to upload songs");
      authModal.openModal();
    } else uploadModal.openModal();
  };

  return (
    <section
      id="YourUploads"
      className="box-within-sidebar h-full overflow-y-auto flex flex-col"
    >
      <div
        id="header of YourUploads"
        className="flex items-center justify-between font-semibold  
           "
      >
        <div
          className={
            "flex items-center gap-x-4 " +
            (userContext?.user && " hover-text-highlight ") +
            (pathname === "youruploads" && "text-HIGHLIGHT")
          }
          onClick={() => userContext?.user && router.push("/youruploads")}
        >
          <RiPlayListFill size={26} />
          <p>Your Uploads</p>
        </div>
        <BiSolidCloudUpload
          onClick={handleClick}
          size={34}
          className="hover-text-highlight"
        />
      </div>
      <div className="space-y-2">
        {/* {children}  */}
        {songs.map((song) => (
          <UploadItem
            key={song.id}
            song={song}
            handleClick={(song) => {
              putSongIntoPlayer(song);
              router.push("youruploads");
            }}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
};

export default YourUploads;
