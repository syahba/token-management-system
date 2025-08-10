import PropTypes from "prop-types";

function Button({ isPrimary, text, onClick }) {
  let styles;
  if (isPrimary) {
    styles = "text-[var(--white-color)] bg-[var(--primary-color)]";
  } else {
    styles = `text-[var(--primary-color)] bg-transparent 
      outline outline-2 outline-[var(--primary-color)] outline-offset-[-1.5px]`;
  }

  return (
    <button
      className={`${styles} px-6 py-1.5 rounded-full 
      hover:scale-105 transition duration-500`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  isPrimary: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
