import { Image } from "@chakra-ui/react";
import styles from "./ImageList.module.scss";
import { FaTrashAlt } from "react-icons/all";

const ImageList = ({ imageFileList, handleDelete }) => {
  return (
    <div className={styles.ImageList}>
      {imageFileList.length === 0 ? (
        <div className={styles.Text}>
          Select files to upload(up to 12 files)
        </div>
      ) : (
        imageFileList.map((item, id) => (
          <div className={styles.ImageItem} key={id}>
            <Image src={URL.createObjectURL(item)} alt="Image here"></Image>
            <FaTrashAlt
              className={styles.btnRemove}
              onClick={() => handleDelete(id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageList;
