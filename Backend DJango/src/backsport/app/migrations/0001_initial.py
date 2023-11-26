# Generated by Django 4.2.7 on 2023-11-24 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('dni', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('birth_date', models.DateField()),
                ('isGBA', models.BooleanField()),
            ],
        ),
    ]