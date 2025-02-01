import { LuDrum, LuGuitar, LuKeyboardMusic, LuSpeaker } from "react-icons/lu";
import { MdOutlineMonitor } from "react-icons/md";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { GiMusicalKeyboard, GiSaxophone } from "react-icons/gi";
import { PiListNumbers } from "react-icons/pi";


// auto-import image list
export const getNestedList = () => {
  const nestedList = {
    drum: ["1.png", "2.png"],
	amplifier: ["1.png", "2.png", "3.png", "4.png"],
    guitar: ["1.png", "2.png"],
    keys: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    microphone: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    monitor: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
	sets: ["1.png", "2.png", "3.png", "4.png", "5.png"],
	misc: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png","9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png"],
    numbers: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png"],
  };
  return nestedList;
};

export const sidebarIcons = {
  drum: LuDrum,
  amplifier: LuSpeaker,
  guitar: LuGuitar,
  keys: LuKeyboardMusic,
  microphone: LiaMicrophoneAltSolid,
  monitor: MdOutlineMonitor,
  sets: GiMusicalKeyboard,
  misc: GiSaxophone,
  numbers: PiListNumbers,
};
