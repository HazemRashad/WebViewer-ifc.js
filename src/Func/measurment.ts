
export function LengthMeasurement(lenBtn, length_measurement, container) {

const active = lenBtn.classList.contains("active")

if (active){
    length_measurement.visible = true;
    length_measurement.enabled = true;
    length_measurement.snapDistance = 1;

container.onclick = () => length_measurement.create();
    window.onkeydown = (event) => {
      if (event.code === "KeyD" || event.code === "Backspace") {
        length_measurement.delete();
      } else if (event.key === "Escape") {
        length_measurement.cancelCreation();
      }
    };
}
}