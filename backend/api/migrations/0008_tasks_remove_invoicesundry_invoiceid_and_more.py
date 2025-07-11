# Generated by Django 5.2.1 on 2025-06-04 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_invoiceheader_remove_reaction_post_invoiceitem_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='invoicesundry',
            name='invoiceId',
        ),
        migrations.DeleteModel(
            name='InvoiceItem',
        ),
        migrations.DeleteModel(
            name='InvoiceHeader',
        ),
        migrations.DeleteModel(
            name='InvoiceSundry',
        ),
    ]
