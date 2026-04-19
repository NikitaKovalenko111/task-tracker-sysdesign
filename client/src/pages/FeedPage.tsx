import { useAppSelector } from '../app/hooks';
import { ProjectStatusPill } from '../components/ProjectStatusPill';

export function FeedPage() {
  const projects = useAppSelector((state) => state.projects.items.filter((item) => item.isPublic));

  return (
    <>
      <section className="u-fade-up">
        <h1 className="main-title">Открытые проекты сообщества</h1>
        <p className="muted-text">Выбирайте проект, следите за задачами и присоединяйтесь к команде.</p>
      </section>

      <section className="page__section page__grid page__grid--3">
        {projects.map((project, index) => (
          <article key={project.id} className={`feed-card u-fade-up u-delay-${Math.min(index + 1, 3)}`}>
            <div className="feed-card__head">
              <h2 className="feed-card__name">{project.name}</h2>
              <ProjectStatusPill status={project.status} />
            </div>
            <p className="feed-card__desc">{project.description}</p>
            <div className="feed-card__stats">
              <span>Задач: {project.tasks}</span>
              <span>Участников: {project.members}</span>
              <span>Обновлено: {project.updatedAt}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
