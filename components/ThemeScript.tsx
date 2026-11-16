/**
 * Runs before first paint: applies the saved theme, or the OS preference,
 * as <html data-theme="…"> so the page never flashes the wrong colours.
 * Keep the storage key in sync with ThemeToggle.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}})()`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
