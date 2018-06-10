import React from "react";
import { shallow } from "enzyme";
import Score from "../Score";

describe("<Score />", () => {
  const gameObjects = {
    teams: [{
      name: "Germany",
      moves: 2,
      score: 7,
    },
    {
      name: "Brazil",
      moves: 0,
      score: 1,
    }]
  };
  const wrapper = shallow(<Score gameObjects={gameObjects} />);
  test("html elements", () => {
    expect(wrapper.find("footer").exists()).toBe(true);
    expect(wrapper.find("div")).toHaveLength(3);
  });

  test("score data", () => {
    const divs = wrapper.find("div");
    expect(divs.at(0).text()).toEqual("7   :   1");
    expect(divs.at(1).text()).toEqual("Germany      Brazil");
    expect(divs.at(2).text()).toEqual("2 moves left");
  });

  test("css classes", () => {
    expect(wrapper.find(".moves-left").exists()).toBe(true);
    expect(wrapper.find(".moves-right").exists()).toBe(false);
  });
});
