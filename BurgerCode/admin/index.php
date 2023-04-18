<!DOCTYPE html>
<html>
    <head>
        <title>Burger Code</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
        <link href='http://fonts.googleapis.com/css?family=Holtwood+One+SC' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        <link rel="stylesheet" href="../css/styles.css">
    </head>

    <body>
        <h1 class="text-logo"><span class="bi-youtube"></span> Burger Code <span class="bi-youtube"></span></h1>
        <div class="container admin">
            <div class="row">
                <h1><strong>Liste des items</strong>
                <a href="insert.php" class="btn btn-success btn-lg"><span class="bi-plus-circle"> </span>Ajouter</a>
                </h1>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix</th>
                            <th>Catégorie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        <?php
                            require 'database.php';
                            $db = Database::connect();
                            $statement = $db->query('SELECT items.id, items.name, items.description, items.price, categories.name AS categorie
                                                    FROM items LEFT JOIN categories ON items.category = categories.id
                                                    ORDER BY items.id DESC');
                            while($item = $statement->fetch())
                            {
                                echo '<tr>';
                                echo '<td>' . $item['name'] . '</td>';
                                echo '<td>' . $item['description'] . '</td>';
                                echo '<td>' . number_format((float)$item['price'],2, '.', '') . '</td>';
                                echo '<td>' . $item['categorie'] . '</td>';
                                echo '<td width=330>
                                        <a href="view.php?id='. $item['id'] .'" class="btn btn-outline-dark"><span class="bi-eye"></span> Voir</a>
                                        <a href="update.php?id='. $item['id'] .'" class="btn btn-primary"><span class="bi-pencil"></span> Modifier</a>
                                        <a href="delete.php?id='. $item['id'] .'" class="btn btn-danger"><span class="bi-x-circle"></span> Supprimer</a>
                                    </td>
                                </tr>';

                            }

                            Database::disconnect();
                        ?>

                        
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>
