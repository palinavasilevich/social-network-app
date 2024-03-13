import React, { useEffect } from "react";
import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetUser, selectCurrent } from "../../features/user/userSlice";
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi";
import {
  useSubscribeUserMutation,
  useUnsubscribeUserMutation,
} from "../../app/services/followApi";
import GoBack from "../../components/GoBack";
import { BASE_URL } from "../../constants";
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ProfileInfo from "../../components/ProfileInfo";
import { formatToDate } from "../../utils/formatToDate";
import CountInfo from "../../components/CountInfo";
import { hasErrorField } from "../../utils/hasErrorField";
import EditProfile from "../../components/EditProfile";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrent);
  const { data } = useGetUserByIdQuery(id ?? "");
  const [subscribeUser] = useSubscribeUserMutation();
  const [unsubscribeUser] = useUnsubscribeUserMutation();
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUser());
  }, []);

  const handleSubscribe = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unsubscribeUser(id).unwrap()
          : await subscribeUser({ followingId: id }).unwrap();

        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return null;
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <GoBack />
      <div className="flex gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                className="gap-2"
                onClick={handleSubscribe}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Unsubscribe" : "Subscribe"}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Edit
              </Button>
            )}
          </div>
        </Card>

        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Email" info={data.email} />
          <ProfileInfo title="Location" info={data.location} />
          <ProfileInfo
            title="Date of Birth"
            info={formatToDate(data.dateOfBirth)}
          />
          <ProfileInfo title="About me" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Subscribers" />
            <CountInfo count={data.following.length} title="Subscriptions" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  );
};

export default UserProfile;
