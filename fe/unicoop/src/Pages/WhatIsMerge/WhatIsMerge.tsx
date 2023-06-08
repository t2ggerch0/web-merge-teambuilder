import React from "react";
import styles from "./WhatIsMerge.module.scss";
import MergeButton from "../../Components/MergeButton/MergeButton";
import NavBar from "../../Components/NavBar/NavBar";
import {
  ConnectWithoutContact,
  AppRegistration,
  QuestionAnswer,
} from "@mui/icons-material";

const WhatIsMerge = () => {
  return (
    <div className={styles.whatIsMerge}>
      <NavBar onChangeMenu={() => {}} />

      <div className={styles.howToUse}>
        <div className={styles.howToUseTitle}>What is merge?</div>
        <div className={styles.contents}>
          <div className={styles.subtitle}>
            <span className={`${styles.logo} ${styles.bright}`}>merge</span>는
            팀 구성부터 팀 협업에 이르기까지 최적의 팀 프로젝트 서비스를
            제공하고자 하는 목표를 가지고 서비스를 만들어 나가고 있습니다.
          </div>
          <div className={styles.instructionBox}>
            <div className={styles.title}>
              <span className={styles.index}>1</span> 프로젝트 참여
            </div>
            <div className={styles.box}>
              <div className={styles.text}>
                <span className={styles.logo}>merge</span>는{" "}
                <b>매칭 알고리즘</b>을 기반으로 각 개발/디자인 협업 팀을
                구성합니다.
                <br />
                내가 관심 있는 프로젝트를 찾아보고,
                <br />
                프로젝트에 신청하여 더 넓은 풀에서 최상의 협업 환경을 누릴 수
                있는 기회를 잡으세요!
              </div>
              <ConnectWithoutContact className={styles.icon} />
            </div>
          </div>
          <div className={styles.instructionBox}>
            <div className={styles.title}>
              <span className={styles.index}>2</span> 프로젝트 등록
            </div>
            <div className={styles.box}>
              <div className={styles.text}>
                <span className={styles.logo}>merge</span>에서는{" "}
                <b>누구나 프로젝트를 등록</b>하고 팀을 구성할 수 있습니다.
                <br />
                동일한 관심사의 사용자들의 신청을 받아, 내가 추구하는 가치에
                따라 팀을 구성하고,
                <br />각 팀들 간에 형성될 네트워크를 기대해보세요!
              </div>
              <AppRegistration className={styles.icon} />
            </div>
          </div>
          <div className={styles.instructionBox}>
            <div className={styles.title}>
              <span className={styles.index}>3</span> 팀 협업
            </div>
            <div className={styles.box}>
              <div className={styles.text}>
                <span className={styles.logo}>merge</span>는 또한 팀 구성 이후에
                협업할 수 있는 <b>소통 공간</b>을 제공합니다.
                <br />
                구성된 팀원들과 주어진 프로젝트를 해내기 위해 마일스톤을 정하고,
                목표를 향해 함께 달려가보세요!
              </div>
              <QuestionAnswer className={styles.icon} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.feedback}>
        <div className={styles.feedbackTitle}>
          <span className={`${styles.logo} ${styles.bright}`}>merge</span>는
          언제나 사용자들의 피드백을 기다리고 있습니다. 자유롭게 피드백을
          남겨주세요!
        </div>
        <textarea placeholder={"피드백을 적어주세요."} />
        <MergeButton backgroundColor={"#609966"} onClick={() => {}}>
          피드백 제출
        </MergeButton>
      </div>
    </div>
  );
};

export default WhatIsMerge;
