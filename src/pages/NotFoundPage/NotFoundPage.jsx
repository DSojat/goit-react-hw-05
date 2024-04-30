import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={css.page_404}>
      <div>
        <div className={css.four_zero_four_bg}>
          <h1>404</h1>
        </div>
        <div className={css.contant_box_404}>
          <h3>Look like you're lost</h3>
          <p>the page you are looking for not avaible!</p>
          <a href="/" className={css.link_404}>
            Go to Home
          </a>
        </div>
      </div>
    </section>
  );
}
