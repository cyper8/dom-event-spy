import { expect } from "chai";
import { SpyOn } from "../src/EventSpy";

describe("SpyOn", () => {
  it("listens on something for events", async () => {
    let target = new EventTarget();
    let event1 = new CustomEvent<{ data: string }>("testevent1", {
      detail: {
        data: "testevent1",
      },
    });
    let event2 = new CustomEvent<{ tellsUs: string }>("happening", {
      detail: {
        tellsUs: "some more information",
      },
    });
    const spy = SpyOn<CustomEvent>(target, 500, "testevent1", "happening");
    target.dispatchEvent(event1);
    target.dispatchEvent(event2);
    let events = await spy;
    expect(events.size).to.be.equal(2);
    expect(events.has("testevent1")).to.be.true;
    expect(events.has("happening")).to.be.true;
    expect(events.get("testevent1")![0].detail).to.deep.equal({
      data: "testevent1",
    });
    expect(events.get("happening")![0].detail).to.deep.equal({
      tellsUs: "some more information",
    });
  });
});
