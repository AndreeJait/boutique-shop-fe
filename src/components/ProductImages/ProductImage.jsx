import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./product-image.module.css";
import { getClassNameWithCondition } from "../../common/utils/className";
import useGetImageProducts from "../../common/hooks/useGetImageProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faSpinner,} from "@fortawesome/free-solid-svg-icons";
export default function ProductImage() {
  const [batch, setBatch] = useState([]);
  const [images, imageKeys] = useGetImageProducts();
  const [batchInfo, setBatchInfo] = useState(12);
  const [parentHeight, setParentHeight] = useState(0);
  const [lastInfo, setLastInfo] = useState({
    lastHeigth: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      lastTotalProcessData: 0,
      lastIsNotSetYet: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let currentBatch = batchInfo;
    if (currentBatch > imageKeys.length) {
      currentBatch = imageKeys.length;
    }
    if (batch.length !== currentBatch) {
        setBatchInfo(currentBatch);
      setBatch(imageKeys.slice(0, currentBatch));
    }
  }, [imageKeys, images, batch, batchInfo]);

  const handleReFactorPosition = useCallback(() => {
    const mainParent = containerRef.current;
    const children = mainParent.childNodes;
    let n = children.length;
    let totalProcessData = lastInfo.lastTotalProcessData;
    let lastHeigth = lastInfo.lastHeigth;
    let isNotSetYet = lastInfo.lastIsNotSetYet;
    if(n > totalProcessData) {
        while (n !== totalProcessData && n !== 0) {
            let currentProcessData = 4;
            if (totalProcessData + currentProcessData > n) {
              currentProcessData = n - totalProcessData;
            }
            let leftBefore = 0;
            for (let i = 0; i < currentProcessData; i++) {
              let nodeToProcess = children[totalProcessData + i];
              nodeToProcess.classList.remove("visually-hidden");
              nodeToProcess.style.width = mainParent.offsetWidth / 4 - 30 + "px";
              if (isNotSetYet) {
                nodeToProcess.style.left = leftBefore + "px";
                lastHeigth[i] = [leftBefore, nodeToProcess.offsetHeight + 40];
                leftBefore += nodeToProcess.offsetWidth + 40;
              } else {
                nodeToProcess.style.left = lastHeigth[i][0] + "px";
                nodeToProcess.style.top = lastHeigth[i][1] + "px";
                lastHeigth[i] = [
                  lastHeigth[i][0],
                  lastHeigth[i][1] + nodeToProcess.offsetHeight + 40,
                ];
              }
            }
            lastHeigth.sort((f, l) => f[1] > l[1]);
            isNotSetYet = false;
            totalProcessData += currentProcessData;
          }
          setParentHeight(lastHeigth[3][1] + 60);
          setLastInfo({
            lastHeigth: lastHeigth,
            lastTotalProcessData: totalProcessData,
            lastIsNotSetYet: isNotSetYet,
          })
    }
    setIsLoading(false);
  }, [lastInfo]);

  useEffect(() => {
    window.addEventListener("resize", ()=> {
        setLastInfo({
            lastHeigth: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
              ],
              lastTotalProcessData: 0,
              lastIsNotSetYet: true,
          });
    });
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (batch.length > 0 && containerRef.current) {
        handleReFactorPosition();
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [batch, handleReFactorPosition]);

  return (
    <div
      className={getClassNameWithCondition({
        [style.mainWrapperProduct]: true,
      })}
    >
      <div>
        <h3>Our Collection</h3>
      </div>
      <div className={`${style.bigWrapProduct}`}>
        <div
          id="product-wrap"
          ref={containerRef}
          style={{ height: parentHeight }}
          className={getClassNameWithCondition({
            [style.productImages]: true,
          })}
        >
          {batch.map((key) => (
            <div key={key} className="shadow-sm rounded overflow-hidden visually-hidden">
              <img src={images[key]} alt="PRODUCTS" />
            </div>
          ))}
        </div>
       {(imageKeys.length !== batchInfo || isLoading) &&  <div id="load-more" className={`${style.loadMore}`}>
          {isLoading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner}/> : <FontAwesomeIcon onClick={()=>{
                setIsLoading(true);
                setBatchInfo(batchInfo + 12);
            }} icon={faArrowDown}/>}
        </div>}
      </div>
    </div>
  );
}
