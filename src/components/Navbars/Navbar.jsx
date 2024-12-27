import React from "react";
import { getClassNameWithCondition } from "../../common/utils/className";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../resources/img/logo/logo.png";
import { useLocation } from "react-router";
export default function Navbar({ navbarItems, additionalItems, ...props }) {
  const location = useLocation();
  return (
    <div
      className={getClassNameWithCondition({
        [styles.navbar]: true,
      })}
    >
      <div
        className={getClassNameWithCondition({
          [styles.navbarItemsGroup]: true,
        })}
      >
        {navbarItems &&
          navbarItems.map((item, index) => (
            <div
              key={`left-${index}`}
              className={getClassNameWithCondition({
                [styles.navbarItems]: true,
                [styles.selected]: location.pathname === item.path,
              })}
            >
              <FontAwesomeIcon icon={item.Icon} />
              <span>{item.title}</span>
            </div>
          ))}
      </div>

      <div
        className={getClassNameWithCondition({
          [styles.logo]: true,
        })}
      >
        <img src={Logo} alt="LOGO" />
      </div>

      {
        <div
          className={getClassNameWithCondition({
            [styles.navbarAdditionalGroup]: true,
          })}
        >
          {additionalItems &&
            additionalItems.map((item, index) => (
              <div key={`rigth-${index}`}
                className={getClassNameWithCondition({
                  [styles.navbarItems]: true,
                })}
              >
                <FontAwesomeIcon icon={item.Icon} />
                <span>{item.title}</span>
              </div>
            ))}
        </div>
      }
    </div>
  );
}
