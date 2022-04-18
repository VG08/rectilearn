"""added ondelete='cascade'

Revision ID: fa233a9d2df5
Revises: b7f136365e25
Create Date: 2022-04-18 07:44:06.224929

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa233a9d2df5'
down_revision = 'b7f136365e25'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('study_sets_creator_fkey', 'study_sets', type_='foreignkey')
    op.create_foreign_key(None, 'study_sets', 'users', ['creator'], ['id'], ondelete='CASCADE')
    op.drop_constraint('studyset_questions_study_set_fkey', 'studyset_questions', type_='foreignkey')
    op.create_foreign_key(None, 'studyset_questions', 'study_sets', ['study_set'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'studyset_questions', type_='foreignkey')
    op.create_foreign_key('studyset_questions_study_set_fkey', 'studyset_questions', 'study_sets', ['study_set'], ['id'])
    op.drop_constraint(None, 'study_sets', type_='foreignkey')
    op.create_foreign_key('study_sets_creator_fkey', 'study_sets', 'users', ['creator'], ['id'])
    # ### end Alembic commands ###