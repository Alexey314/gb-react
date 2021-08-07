export default function Weather({ info: { temperature, wind, description }}) {
  return (
    <div>
      <p>Temperature: {temperature}</p>
      <p>Wind: {wind}</p>
      <p>{description}</p>
    </div>
  );
}
