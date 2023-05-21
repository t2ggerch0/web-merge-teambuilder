import React, { FC, useState } from "react";
import styles from "./ManageProject.module.scss";
import Layout from "../../Components/Layout/Layout";
import { ClassType, Menu } from "../../interface";
import { hostApi } from "../../API/hostApi";
import { useAuthContext } from "../../Context/UnicoopContext";
import { guestApi } from "../../API/guestApi";
import { teamApi } from "../../API/teamApi";

type ManageProjectProps = {
  selectedMenu: Menu;
  onChangeMenu(menuId: Menu): void;
};

const ManageProject: FC<ManageProjectProps> = ({
  selectedMenu,
  onChangeMenu,
}) => {
  const [isPopOn, setIsPopOn] = useState<boolean>(false);
  const [currentClass, setCurrentClass] = useState<ClassType | undefined>(
    undefined
  );
  //const [classes, setClasses] = useState<ClassType[]>([]);
  const { myInfo, setMyInfo } = useAuthContext();

  const onClickModal = () => {
    setIsPopOn(!isPopOn);
  };

  const myHostClasses = hostApi.getClass(myInfo?.token ?? "").then((res) => {
    console.log("host class", res.hostClasses);
    return res;
  });

  const myGuestClasses = guestApi.getClass(myInfo?.token ?? "").then((res) => {
    console.log("guest class", res.guestClasses);
  });

  /*const getClassesInfoAll = async () => {
    if (userInfoHandle.myInfo) {
    }
  };
  const onClickClass = (classId?: string) => {
    setCurrentClass(classes.find((item) => item?._id === classId));
  };

  const onFinishEditQuestion = (classId?: string) => {
    if (classId && userInfoHandle.myInfo?.token) {
      authApi.endQuestion({
        token: userInfoHandle.myInfo?.token,
        classId,
      });
    }
  };*/

  /*useEffect(() => {
    let token = getMyToken();
    authApi
      .getMyInfo(token)
      .then((res) => {
        console.log("res", res.user);
        userInfoHandle.setMyInfo({
          classes: res?.user.classes ?? [],
          email: res?.user.email ?? "",
          id: res?.user?._id ?? "",
          name: res?.user.name ?? "",
          password: res?.user.password ?? "",
          token,
        });
        return res.user.classes as string[];
      })
      .then(async (classes) => {
        const result = await Promise.all(
          classes.map((id) => {
            return authApi.getClassInfo(id).then((res) => {
              return res as ClassType;
            });
          })
        );
        setClasses(result);
      });
  }, []);*/

  // useSWR을 활용한 class/host GET Method

  /*const { data, error } = useSWR<{ hostClasses: Array<NewClassType> }>(
    `/class/host`,
    swrFetcher
  );
  if (!data) {
    return <div></div>;
  } else {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }*/

  /*const classId = "645d16f0ecc97092d68543e2";

  const { data, error } = useSWR<{ targetClass: NewClassType }>(
    `/class?classId=${classId}`,
    swrFetcher
  );
  if (!data) {
    return <div></div>;
  }
  if (error) {
    console.log(error);
  }*/

  return (
    <Layout
      pageTitle={"프로젝트 관리"}
      selectedMenu={selectedMenu}
      onChangeMenu={onChangeMenu}>
      <div className={styles.container}>
        {/*classes.length === 0 && (
          <div className={styles.noClass}>
            <div className={styles.title}>아직 등록된 프로젝트가 없습니다.</div>
            <div className={styles.subtitle}>
              교수님으로부터 받은 입장코드를 통해 지금 프로젝트에 등록하세요.
            </div>
          </div>
        )*/}
        <div className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={onClickModal}>
            프로젝트 입장하기
          </button>
        </div>

        <div
          className={`${currentClass === undefined && styles.class_container}`}>
          {/*currentClass === undefined ? (
            classes.map((item, index) => (
              <Class
                key={`class_${item?._id}`}
                classInfo={item}
                order={index}
                onClickClass={onClickClass}
              />
            ))
          ) : (
            <EditProject
              classInfo={currentClass}
              onClickClass={onClickClass}
              onFinishEditQuestion={onFinishEditQuestion}
            />
          )*/}
        </div>
        {/*<ProjectBox projectInfo={data.hostClasses[0]} />*/}
        {/*isPopOn && (
          <CodePopUp
            projectInfo={data.hostClasses[0] ?? {}}
            isPopOn={isPopOn}
            setIsPopOn={setIsPopOn}
          />
        )*/}
      </div>
    </Layout>
  );
};

export default ManageProject;
