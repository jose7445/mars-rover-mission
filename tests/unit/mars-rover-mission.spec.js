import { shallowMount } from "@vue/test-utils";
import PanelControl from "../../src/components/PanelControl.vue";

describe("PanelControl", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PanelControl);
  });

  it("should alert missing data if fields are empty", async () => {
    // Espía el método `alert`
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Simula un clic en el botón "Play" con campos vacíos
    await wrapper.find("button").trigger("click");

    // Verifica que se haya llamado al alert con el mensaje correcto
    expect(alertSpy).toHaveBeenCalledWith(
      "Missing data: Position X, Position Y, Direction"
    );

    // Limpia el espía
    alertSpy.mockRestore();
  });
});
