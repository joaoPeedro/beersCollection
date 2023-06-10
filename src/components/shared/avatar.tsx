import React from "react";
import Image from "next/image";
import styles from "./styles/avatar.module.scss";
type AvatarProps = {
  url: string;
  alt: string;
  description: string;
  width?: number;
  height?: number;
};

export default function Avatar({
  url,
  alt,
  description,
  width = 55,
  height = 55,
}: AvatarProps) {
  return (
    <span className={styles.containerAvatar}>
      <picture>
        <Image src={url} width={width} height={height} alt={alt} />
      </picture>
      <p className="heading-5">{description}</p>
    </span>
  );
}
