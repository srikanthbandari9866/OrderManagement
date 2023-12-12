using Microsoft.EntityFrameworkCore.Migrations;

namespace OrderProject.Migrations
{
    public partial class db : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "TempItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TempItems_ItemId",
                table: "TempItems",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_TempItems_Item_ItemId",
                table: "TempItems",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TempItems_Item_ItemId",
                table: "TempItems");

            migrationBuilder.DropIndex(
                name: "IX_TempItems_ItemId",
                table: "TempItems");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "TempItems");
        }
    }
}
