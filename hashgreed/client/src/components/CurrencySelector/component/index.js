import CreatableSelect from "react-select/creatable";
import Select from "react-select/";
import { components } from "react-select";

const CurrencySelector = ({ handleChange, creatable, data }) => {
  const selectStyle = {
    menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",

      color: "#535254",
      textAlign: "left",
    }),
  };

  const Option = (props) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {data.image ? (
            <img
              src={data.image}
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <></>
          )}
          {data.label}
        </div>
      </components.Option>
    );
  };

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };

  const SingleValue = (props) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {data.image ? (
            <img
              src={data.image}
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
          ) : (
            <></>
          )}
          <span>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  const selectProps = {
    options: data,
    components: { Option, Placeholder, SingleValue },
    onChange: (option, action) => {
      if (handleChange) handleChange(option.value);
    },
    styles: selectStyle,
    placeholder: "Select",
  };

  return (
    <div style={{ width: "100%" }}>
      {creatable ? (
        <CreatableSelect {...selectProps} />
      ) : (
        <Select {...selectProps} isSearchable={false} />
      )}
    </div>
  );
};

export default CurrencySelector;
