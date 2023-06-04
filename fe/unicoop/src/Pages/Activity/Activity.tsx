import React, { useEffect, useState } from "react";
import styles from "./Activity.module.scss";
import useSWR from "swr";
import ActivitySidebar from "./ActivitySidebar/ActivitySidebar";
import ActivityChat from "./ActivityChat/ActivityChat";
import ActivityTeam from "./ActivityTeam/ActivityTeam";
import ActivityInfo from "./ActivityInfo/ActivityInfo";
import Loader from "../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import { authApi, swrFetcher } from "../../API/authApi";
import { getMyToken, viewToastError } from "../../helper";
import { NewClassType } from "../../interface";
import ActivityManage from "./ActivityManage/ActivityManage";
import { useAuthContext } from "../../Context/UnicoopContext";

const Activity = () => {
  const { projectId, isHost } = useParams();

  // const [activityArray, setActivityArray] = useState<Array<string>>([
  //   "팀 관리",
  //   "팀 정보",
  //   "팀 채팅",
  // ]);
  const [activityIndex, setActivityIndex] = useState<number>(0);
  const { myInfo, setMyInfo } = useAuthContext();
  const { data, error, isValidating } = useSWR<{
    targetClass: NewClassType;
  }>(`/class?classId=${projectId}`, swrFetcher);
  // if (!data || isValidating) {
  //   return <Loader />;
  // }
  // if (error) {
  //   viewToastError(error);
  // }
  // console.log(isHost, activityIndex);

  useEffect(() => {
    // update my info
    let token = getMyToken() ?? "";
    authApi.getMyInfo(token).then((res) => {
      setMyInfo({
        classes: res?.user.classes ?? [],
        email: res?.user.email ?? "",
        id: res?.user._id ?? "",
        name: res?.user.name ?? "",
        password: res?.user.password ?? "",
        token: token ?? "",
      });
    });
  }, []);

  return (
    <div className={styles.activity}>
      <ActivitySidebar
        activityArray={
          isHost === "true"
            ? ["팀 관리", "팀 정보", "팀 채팅"]
            : ["팀 정보", "팀 채팅"]
        }
        activityIndex={activityIndex}
        setActivityIndex={setActivityIndex}
      />
      {activityIndex === 0 && isHost === "true" ? (
        <ActivityManage data={data?.targetClass} />
      ) : (activityIndex === 0 && isHost === "false") ||
        (activityIndex === 1 && isHost === "true") ? (
        <ActivityTeam classData={data} />
      ) : (
        <ActivityChat />
      )}
      <ActivityInfo />
    </div>
  );
};

export default Activity;
