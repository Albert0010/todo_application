import { useReducer, useState } from "react";
import {
  Input,
  ListItem,
  List,
  Divider,
  Button,
  Icon,
  CheckBox,
  styled,
} from "@ui-kitten/components";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableNativeFeedback,
  useWindowDimensions,
} from "react-native";

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          _id: Math.random(),
          title: action.payload.title,
          isChecked: false,
          isEdit: false,
        },
      ];
    }
    case "delete": {
      return state.filter((v) => v._id !== action.payload._id);
    }
    case "check": {
      return state.map((v) => {
        if (v._id === action.payload._id) {
          v.isChecked = !v.isChecked;
        }
        return v;
      });
    }
    case "submit": {
      return state.map((v) => {
        if (v._id === action.payload._id) {
          console.log(v,'before');
          v.title = action.payload.newString;
          v.isEdit = false;
          console.log(v,'after');
        }
        return v;
      });
    }
    case "edit": {
      return state.map((v) => {
        if (v._id === action.payload._id) {
          v.isEdit = true;
        }
        return v;
      });
    }
    case "cancel": {
      return state.map((v) =>
        v._id === action.payload._id ? { ...v, isEdit: false } : v
      );
    }
    default:
      return state;
  }
};

function WelcomeScreen() {
  const [state, dispatch] = useReducer(reducer, initialState, undefined);
  const [input, setInput] = useState("");
  const [newInput, setNewInput] = useState("");

  const handleChangeInput = () => (e) => {
    setInput(e);
  };
  const handleDelete = (_id) => () => {
    dispatch({ type: "delete", payload: { _id } });
  };
  const handleIsChecked = (_id) => () => {
    dispatch({ type: "check", payload: { _id } });
  };
  const handleClick = () => {
    dispatch({ type: "add", payload: { title: input } });
    setInput("");
  };
  const handleEditSubmit = (_id,newString) => () => {
    dispatch({ type: "submit", payload: { newString, _id } });
    setNewInput('')
  };
  const handleEdit = (_id) => () => {
    dispatch({ type: "edit", payload: { _id } });
  };
  const handleCancel = (_id) => () => {
    dispatch({ type: "cancel", payload: { _id } });
    setNewInput('')

  };
  const handleNewStringChange = ()=>(e)=>{
    setNewInput(e)
  }

  const renderItemAccessory = (_id, cb, title, input) => () =>
    (
      <Button size="tiny" onPress={cb} disabled={!input?.trim()}>
        {title}
      </Button>
    );

  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.background}>
      <View>
        <View>
          <Input
            placeholder="Place your Todo"
            value={input}
            style={styles.input}
            onChangeText={handleChangeInput()}
            accessoryRight={renderItemAccessory(
              undefined,
              handleClick,
              "add",
              input
            )}
          />
        </View>
      </View>

      <View
        style={{
          display: "flex",
          gap: "15px",
          width: width,
        }}
      >
        {state.map(({ _id, title, isChecked, isEdit }) => (
          // <ListItem
          //   title={title}
          //   accessoryRight={renderItemAccessory(_id,handleDelete(_id),'Delete','delete')}
          //   accessoryLeft={
          //     <CheckBox
          //       checked={isChecked}
          //       onChange={handleIsChecked(_id)}
          //     ></CheckBox>
          //   }
          // />

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: 10,
              width: width - (!isEdit ? styles.image1.width : 100),
            }}
            key={_id}
          >

            {!isEdit ? (
              <View style={styles.edit}>
                <CheckBox checked={isChecked} onChange={handleIsChecked(_id)} />
                <Text>{title}</Text>
              </View>
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <View>
                  <Input style={{ width: 150, height: 50, marginLeft: 10 }} value={newInput} onChangeText={handleNewStringChange()} />
                </View>
                <Button
                  style={{ height: 30 }}
                  disabled={!newInput.trim()}
                  onPress={handleEditSubmit(_id, newInput)}
                >
                  Submit
                </Button>
                <Button style={{ height: 30 }} onPress={handleCancel(_id)}>
                  Cancel
                </Button>
              </View>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {!isEdit ? (
                <TouchableNativeFeedback onPress={handleEdit(_id)}>
                  <Image
                    source={require("../assets/edit.png")}
                    style={styles.image1}
                  />
                </TouchableNativeFeedback>
              ) : null}
              {!isEdit ? (
                <Button onPress={handleDelete(_id)}>Delete</Button>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// <View>
//   <CheckBox
//     checked={isChecked}
//     onChange={()=>console.log(15)}>
//   </CheckBox>
// </View>

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
  image1: { width: 30, height: 30 },
  background: {
    position: "relative",
  },
  list: {
    display: "flex",
  },
  inputView: {
    display: "flex",
  },
  input: {
    width: 300,
    borderColor: "black",
    height: 100,
  },
  edit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: 30,
    height: 15,
  },
});

export default WelcomeScreen;
